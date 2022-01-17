"""empty message

Revision ID: ce0203c2d8b5
Revises: 67286edd5386
Create Date: 2022-01-17 17:19:56.863271

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ce0203c2d8b5'
down_revision = '67286edd5386'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('historial', sa.Column('anotacion', sa.String(length=500), nullable=False))
    op.drop_column('historial', 'diagnostico')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('historial', sa.Column('diagnostico', sa.VARCHAR(length=500), autoincrement=False, nullable=False))
    op.drop_column('historial', 'anotacion')
    # ### end Alembic commands ###
