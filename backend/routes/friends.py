from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models import Friend, User

friends_bp = Blueprint('friends', __name__)

# Добавить друга
@friends_bp.route('/friends', methods=['POST'])
@jwt_required()
def add_friend():
    data = request.get_json()
    user_id = get_jwt_identity()
    
    # Проверка, существует ли пользователь-друг
    friend = User.query.get(data['friend_id'])
    if not friend:
        return jsonify({"error": "User not found"}), 404
    
    new_friend = Friend(user_id=user_id, friend_id=data['friend_id'])
    db.session.add(new_friend)
    db.session.commit()
    return jsonify({"message": "Friend added!"}), 201

# Удалить друга
@friends_bp.route('/friends/<int:friend_id>', methods=['DELETE'])
@jwt_required()
def remove_friend(friend_id):
    user_id = get_jwt_identity()
    friend = Friend.query.filter_by(user_id=user_id, friend_id=friend_id).first()
    if not friend:
        return jsonify({"error": "Friend not found"}), 404
    db.session.delete(friend)
    db.session.commit()
    return jsonify({"message": "Friend removed"}), 200