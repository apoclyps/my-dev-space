# services/users/project/tests/test_config.py


import os
import unittest

from flask import current_app
from flask_testing import TestCase

from project import create_app


app = create_app()


class TestDevelopmentConfig(TestCase):
    def create_app(self):
        app.config.from_object("project.config.DevelopmentConfig")
        return app

    def test_app_is_development(self):
        self.assertEqual(app.config["SECRET_KEY"], os.environ.get("SECRET_KEY"))
        self.assertTrue(app.config["DEBUG"])
        self.assertFalse(current_app is None)
        self.assertEqual(
            app.config["SQLALCHEMY_DATABASE_URI"], os.environ.get("DATABASE_URL")
        )
        self.assertEqual(app.config["BCRYPT_LOG_ROUNDS"], 4)
        self.assertEqual(app.config["TOKEN_EXPIRATION_DAYS"], 30)
        self.assertEqual(app.config["TOKEN_EXPIRATION_SECONDS"], 0)


class TestTestingConfig(TestCase):
    def create_app(self):
        app.config.from_object("project.config.TestingConfig")
        return app

    def test_app_is_testing(self):
        self.assertEqual(app.config["SECRET_KEY"], os.environ.get("SECRET_KEY"))
        self.assertTrue(app.config["DEBUG"])
        self.assertTrue(app.config["TESTING"])
        self.assertFalse(app.config["PRESERVE_CONTEXT_ON_EXCEPTION"])
        self.assertEqual(
            app.config["SQLALCHEMY_DATABASE_URI"], os.environ.get("DATABASE_TEST_URL")
        )
        self.assertEqual(app.config["BCRYPT_LOG_ROUNDS"], 4)
        self.assertEqual(app.config["TOKEN_EXPIRATION_DAYS"], 0)
        self.assertEqual(app.config["TOKEN_EXPIRATION_SECONDS"], 3)


class TestProductionConfig(TestCase):
    def create_app(self):
        app.config.from_object("project.config.ProductionConfig")
        return app

    def test_app_is_production(self):
        self.assertEqual(app.config["SECRET_KEY"], os.environ.get("SECRET_KEY"))
        self.assertFalse(app.config["DEBUG"])
        self.assertFalse(app.config["TESTING"])
        self.assertEqual(app.config["BCRYPT_LOG_ROUNDS"], 13)
        self.assertEqual(app.config["TOKEN_EXPIRATION_DAYS"], 30)
        self.assertEqual(app.config["TOKEN_EXPIRATION_SECONDS"], 0)


if __name__ == "__main__":
    unittest.main()
