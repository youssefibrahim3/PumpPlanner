from flask import Flask, jsonify, request
from flask_cors import CORS
import bcrypt
import json

app = Flask(__name__)
CORS(app)

users = []

@app.route("/signup",methods=["POST"])
def createUser():
    pass