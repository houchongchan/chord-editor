from flask import Flask, jsonify, redirect, Response, request
from flask_cors import CORS

api = Flask(__name__)
CORS(api)


@api.route("/diagnoses/<id>/exports/send-sms/", methods=["POST"])
def share_pdf_sms(id):
    return Response(status=200)
