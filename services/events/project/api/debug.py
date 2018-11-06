# 3rd party
from flask import Blueprint
from flask import render_template

debug_blueprint = Blueprint("debug", __name__)


@debug_blueprint.route("/debug", methods=["GET"])
def index():
    return render_template("index.html")
