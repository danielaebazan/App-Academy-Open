from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, SubmitField
from wtforms.validators import DataRequired
from map.map import map

cities = list(map.keys())

class Shipping(FlaskForm):
   sender = StringField('Sender', validators = [DataRequired()])
   recipient = StringField('Recipient', validators = [DataRequired()])
   origin = SelectField('Origin', choices = cities, validators = [DataRequired()])
   destination = SelectField('Destination', choices = cities, validators = [DataRequired()])
   express = BooleanField('Express Shipping', validators = [])
   submit = SubmitField('Submit')
   cancel = SubmitField('Cancel')