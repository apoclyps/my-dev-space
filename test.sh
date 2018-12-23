#!/bin/bash

env=$1
file=""
fails=""

if [[ "${env}" == "dev" ]]; then
  file="docker-compose-dev.yml"
elif [[ "${env}" == "stage" ]]; then
  file="docker-compose-stage.yml"
elif [[ "${env}" == "prod" ]]; then
  file="docker-compose-prod.yml"
else
  echo "USAGE: sh test.sh environment_name"
  echo "* environment_name: must either be 'dev', 'stage', or 'prod'"
  exit 1
fi

build() {
  image_name=$1
  docker-compose -f $file build $image_name
}

section_start() {
  start_time=`date +%s`
  echo -en "travis_fold:start:$1\\r"
  echo $1
  set -x
}

section_end() {
  set +x
  echo -en "travis_fold:end:$1\\r"
  end_time=`date +%s`
  runtime=$((end_time - start_time))
  echo "Took $runtime seconds"
  echo "-------------------------"
}

inspect() {
  if [ $1 -ne 0 ]; then
    fails="${fails} $2"
  fi
}

# Build and start containers
section_start 'setup'
docker-compose -f $file up --build -d
if [[ "${env}" != "dev" ]]; then
  sleep 15 # allow time for the docker containers to come up prior to running tests
fi
section_end 'setup'

# Users service
image='users-service'
section_start $image
build $image
docker-compose -f $file run $image py.test --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml
inspect $? $image
section_end $image

# Events service
image='events-service'
section_start $image
build $image
docker-compose -f $file run $image py.test --black --pep8 --flakes -vv --mccabe --cov=project --cov-report=term-missing --junitxml=test-results/results.xml
inspect $? $image
section_end $image

# Client
image='client-test'
section_start $image
build $image
docker-compose -f $file run client-test npm run lint
inspect $? client-lint
CI=true docker-compose -f $file run client-test npm test -- --coverage
inspect $? $image
section_end $image

# Integration tests
section_start 'integration-test'
if [[ "${env}" != "stage" ]]; then
  testcafe chrome e2e
  inspect $? integration-test
else
  testcafe chrome e2e/index.test.js
  inspect $? integration-test
fi
section_end 'integration-test'

# Stop containers
section_start 'teardown'
docker-compose -f $file down
section_end 'teardown'

# Output success / failure
if [ -n "${fails}" ]; then
  echo "Tests failed: ${fails}"
  exit 1
else
  echo "Tests passed!"
  exit 0
fi
