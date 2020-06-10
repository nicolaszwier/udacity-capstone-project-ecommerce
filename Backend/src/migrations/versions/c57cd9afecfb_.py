"""empty message

Revision ID: c57cd9afecfb
Revises: a338f398e1f4
Create Date: 2020-06-01 19:18:28.339213

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c57cd9afecfb'
down_revision = 'a338f398e1f4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('cart_customer_id_fkey', 'cart', type_='foreignkey')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key('cart_customer_id_fkey', 'cart', 'user', ['customer_id'], ['id'])
    # ### end Alembic commands ###