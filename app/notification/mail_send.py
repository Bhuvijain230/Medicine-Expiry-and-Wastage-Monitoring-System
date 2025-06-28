from flask_mail import Mail, Message
from flask import Flask
from config import *

mail = Mail()

def init_mail(app):
    app.config.from_object('config')
    mail.init_app(app)

def send_email(recipient):
    msg = Message(
        subject="Expiry Date Reached",
        sender=MAIL_USERNAME,
        recipients=[recipient],
        body="Expiry date reached"
    )
    try:
        mail.send(msg)
        print(f"Email sent to {recipient}")
    except Exception as e:
        print(f" Failed to send email to {recipient}: {e}")
