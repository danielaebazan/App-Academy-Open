from flask import Blueprint, render_template, redirect, url_for
from app.forms.shipping import Shipping
from app.models import Package, db

index_bp = Blueprint("index", __name__, url_prefix="/")

@index_bp.route("/")
def index():
    title = 'Package Tracker'
    body = 'Welcome to index page!'
    packages = Package.query.all()
    return render_template("package_status.html", title=title, body=body, packages=packages)

@index_bp.route("/new_package", methods = ['GET', 'POST'])
def new_package():
    form = Shipping() 
    if form.cancel.data:  # if cancel button is clicked, the form.cancel.data will be True
        return '<h1>Cancelled</h1>'
    if form.validate_on_submit():
        data = form.data
        Package.advance_all_locations() # imitate movement
        new_package = Package(sender=data["sender"],
                              recipient=data["recipient"],
                              origin=data["origin"],
                              destination=data["destination"],
                              location=data["origin"])
        db.session.add(new_package)
        db.session.commit()
        return redirect(url_for('index.index'))
    return render_template('shipping_request.html', form = form)
    
        