"""empty message

Revision ID: 3a6df389b140
Revises: 
Create Date: 2022-01-02 18:05:12.288808

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3a6df389b140'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('psicologo',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('nombre', sa.String(length=120), nullable=False),
    sa.Column('telefono', sa.String(length=12), nullable=False),
    sa.Column('direccion_comercial', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('direccion_comercial'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('nombre'),
    sa.UniqueConstraint('telefono')
    )
    op.create_table('paciente',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('telefono', sa.String(length=12), nullable=False),
    sa.Column('psicologo_id', sa.Integer(), nullable=True),
    sa.Column('fecha_nacimiento', sa.Date(), nullable=True),
    sa.Column('nombre', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('direccion', sa.String(length=120), nullable=True),
    sa.Column('diagnóstico', sa.String(length=120), nullable=True),
    sa.Column('estado_civil', sa.String(length=120), nullable=True),
    sa.Column('nro_hijos', sa.Integer(), nullable=True),
    sa.Column('nacionalidad', sa.String(length=120), nullable=True),
    sa.Column('username', sa.String(length=120), nullable=True),
    sa.ForeignKeyConstraint(['psicologo_id'], ['psicologo.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('nombre'),
    sa.UniqueConstraint('telefono')
    )
    op.create_table('bot',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('respuesta', sa.String(length=120), nullable=False),
    sa.Column('paciente_id', sa.Integer(), nullable=True),
    sa.Column('fecha', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['paciente_id'], ['paciente.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bot')
    op.drop_table('paciente')
    op.drop_table('psicologo')
    # ### end Alembic commands ###
