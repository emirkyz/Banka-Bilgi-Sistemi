"""empty message

Revision ID: d92d7e887827
Revises: 
Create Date: 2023-12-09 18:14:57.926785

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd92d7e887827'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sube',
    sa.Column('sube_adi', sa.String(), nullable=False),
    sa.Column('sube_adresi', sa.String(), nullable=False),
    sa.Column('sube_tel', sa.String(), nullable=True),
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('olusturulma_tarihi', sa.DateTime(), nullable=False),
    sa.Column('guncellenme_tarihi', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('musteri',
    sa.Column('musteri_adi', sa.String(), nullable=False),
    sa.Column('musteri_soyad', sa.String(), nullable=False),
    sa.Column('musteri_tc', sa.String(), nullable=False),
    sa.Column('musteri_imza', sa.String(), nullable=False),
    sa.Column('musteri_sube_id', sa.Integer(), nullable=False),
    sa.Column('musteri_total_kredi', sa.Float(), nullable=True),
    sa.Column('musteri_kredi_skor', sa.Float(), nullable=True),
    sa.Column('musteri_total_kredi_tutar', sa.Float(), nullable=True),
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('olusturulma_tarihi', sa.DateTime(), nullable=False),
    sa.Column('guncellenme_tarihi', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['musteri_sube_id'], ['sube.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('hesap',
    sa.Column('hesap_AcilisTarih', sa.String(), nullable=False),
    sa.Column('hesap_AcanSube', sa.String(), nullable=False),
    sa.Column('hesap_HesapNo', sa.String(), nullable=False),
    sa.Column('hesap_ParaBirim', sa.String(), nullable=False),
    sa.Column('hesap_Aciklama', sa.String(), nullable=False),
    sa.Column('hesap_musteri_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('olusturulma_tarihi', sa.DateTime(), nullable=False),
    sa.Column('guncellenme_tarihi', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['hesap_musteri_id'], ['musteri.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('kredi',
    sa.Column('kredi_durum', sa.String(), nullable=True),
    sa.Column('kredi_musteri_id', sa.Integer(), nullable=False),
    sa.Column('kredi_faiz_orani', sa.Float(), nullable=False),
    sa.Column('kredi_son_tarih', sa.DateTime(), nullable=False),
    sa.Column('kredi_tutar', sa.Float(), nullable=False),
    sa.Column('kredi_ay', sa.Integer(), nullable=True),
    sa.Column('kredi_geri_odeme', sa.Float(), nullable=True),
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('olusturulma_tarihi', sa.DateTime(), nullable=False),
    sa.Column('guncellenme_tarihi', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['kredi_musteri_id'], ['musteri.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('fatura',
    sa.Column('fatura_musteri_id', sa.Integer(), nullable=False),
    sa.Column('fatura_hesap_id', sa.Integer(), nullable=False),
    sa.Column('fatura_miktar', sa.String(), nullable=False),
    sa.Column('fatura_tarih', sa.String(), nullable=False),
    sa.Column('fatura_son_tarih', sa.String(), nullable=False),
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('olusturulma_tarihi', sa.DateTime(), nullable=False),
    sa.Column('guncellenme_tarihi', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['fatura_hesap_id'], ['hesap.id'], ),
    sa.ForeignKeyConstraint(['fatura_musteri_id'], ['musteri.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('hesapHaraket',
    sa.Column('hareket_hesap_id', sa.Integer(), nullable=False),
    sa.Column('hareketMiktar', sa.String(), nullable=False),
    sa.Column('haraketTarih', sa.String(), nullable=False),
    sa.Column('hareketAciklama', sa.String(), nullable=False),
    sa.Column('hareket_turu', sa.String(), nullable=False),
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('olusturulma_tarihi', sa.DateTime(), nullable=False),
    sa.Column('guncellenme_tarihi', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['hareket_hesap_id'], ['hesap.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('hesapHaraket')
    op.drop_table('fatura')
    op.drop_table('kredi')
    op.drop_table('hesap')
    op.drop_table('musteri')
    op.drop_table('sube')
    # ### end Alembic commands ###