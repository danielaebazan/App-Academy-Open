from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, Boolean
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Employee(db.Model, UserMixin):
    __tablename__ = 'employees'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable = False)
    employee_number = Column(Integer, nullable = False, unique = True )
    hashed_password = Column(String(255), nullable = False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Menu(db.Model, UserMixin):
    __tablename__ = 'menus'
    id = Column(Integer, primary_key=True)
    name = Column(String(30), nullable = False)
    items = relationship("MenuItem", back_populates=('menu'))

class MenuItem(db.Model, UserMixin):
    __tablename__ = 'menu_items'
    id = Column(Integer, primary_key=True)
    name = Column(String(30), nullable = False)
    price = Column(Float, nullable = False)
    menu_id = Column(Integer, ForeignKey('menus.id'), nullable = False)
    menu_type = Column(Integer, ForeignKey('menu_item_types.id'), nullable = False)
    
    type = relationship("MenuItemType")
    menu = relationship("Menu", back_populates=('items'))

class MenuItemType(db.Model, UserMixin):
    __tablename__ = 'menu_item_types'
    id = Column(Integer, primary_key=True)
    name = Column(String(20), nullable = False)


class Table(db.Model, UserMixin):
    __tablename__ = 'tables'
    id = Column(Integer, primary_key=True)
    number = Column(Integer, nullable = False, unique = True)
    capacity = Column(Integer, nullable = False)

class Order(db.Model, UserMixin):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    emloyee_id = Column(Integer, ForeignKey('employees.id'), nullable = False)
    table_id = Column(Integer, ForeignKey('tables.id'), nullable = False)
    finished = Column(Boolean, nullable = False)

    details = relationship('OrderDetail', back_populates = 'order')
    employee = relationship('Employee')
    table = relationship('Table')


class OrderDetail(db.Model, UserMixin):
    __tablename__ = 'order_details'
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey('orders.id'), nullable = False)
    menu_item_id = Column(Integer, ForeignKey('menu_items.id'), nullable = False)
    
    order = relationship('Order', back_populates = 'details')
    item = relationship('MenuItem')