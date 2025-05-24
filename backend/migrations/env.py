from __future__ import with_statement
import logging
from logging.config import fileConfig

from flask import current_app
from alembic import context

# Импорт ваших моделей ОБЯЗАТЕЛЕН для autogenerate
from models import User, Task, Friend  # Добавьте эту строку

# Настройка логгирования
fileConfig(context.config.config_file_name)
logger = logging.getLogger('alembic.env')

# Используем metadata из вашего db объекта
target_metadata = current_app.extensions['migrate'].db.metadata

def run_migrations_offline():
    """Запуск миграций в offline-режиме."""
    url = context.config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True  # Включение сравнения типов столбцов
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Запуск миграций в online-режиме."""
    def process_revision_directives(context, revision, directives):
        if getattr(context.config.cmd_opts, 'autogenerate', False):
            script = directives[0]
            if script.upgrade_ops.is_empty():
                directives[:] = []
                logger.info('No changes in schema detected.')

    connectable = current_app.extensions['migrate'].db.get_engine()

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            process_revision_directives=process_revision_directives,
            compare_type=True,  # Включение сравнения типов столбцов
            render_as_batch=True  # Для лучшей поддержки SQLite
        )

        with context.begin_transaction():
            context.run_migrations()

# Выбор режима миграции
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()