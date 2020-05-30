"""empty message

Revision ID: bec91c6fff1b
Revises: 71cba50de655
Create Date: 2020-05-21 20:44:29.094300

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bec91c6fff1b'
down_revision = '71cba50de655'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cart',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=True),
    sa.Column('product_price', sa.Numeric(), nullable=True),
    sa.Column('discount', sa.Numeric(), nullable=True),
    sa.Column('total_price', sa.Numeric(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cart')
    # ### end Alembic commands ###