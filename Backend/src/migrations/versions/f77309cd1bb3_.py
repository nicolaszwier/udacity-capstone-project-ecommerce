"""empty message

Revision ID: f77309cd1bb3
Revises: 61bea937cd38
Create Date: 2020-05-21 21:02:14.589271

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f77309cd1bb3'
down_revision = '61bea937cd38'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('cart_product_id_fkey', 'cart', type_='foreignkey')
    op.create_foreign_key(None, 'cart', 'product', ['product_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'cart', type_='foreignkey')
    op.create_foreign_key('cart_product_id_fkey', 'cart', 'user', ['product_id'], ['id'])
    # ### end Alembic commands ###