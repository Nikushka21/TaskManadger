from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_mail import Message
from app import db, mail
from models import User, Task

notifications_bp = Blueprint('notifications', __name__)

@notifications_bp.route('/notify/<int:task_id>', methods=['POST'])
@jwt_required()
def notify(task_id):
    # 1. Получаем данные пользователя
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    task = Task.query.get(task_id)
    
    if not user or not task:
        return jsonify({"error": "User or task not found"}), 404
    
    # 2. Отправляем письмо
    try:
        msg = Message(
            subject=f"Напоминание: {task.title}",
            sender="noreply@yourdomain.com",  # Официальный email вашего приложения
            recipients=[user.email],  # Email пользователя из БД
            body=f"""Привет, {user.username}!
            
Напоминаем о задаче: {task.title}
Описание: {task.description}
Срок выполнения: {task.due_date}
"""
        )
        mail.send(msg)
        return jsonify({"message": f"Notification sent to {user.email}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500