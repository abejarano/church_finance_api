from django.db import models
from django_softdelete.models import SoftDeleteModel
from django.utils.translation import gettext_lazy as _

from apps.church.models import Church


# Create your models here.

class Product(SoftDeleteModel):
    FIXED_ASSETS = 'FIXED_ASSETS'
    CONSUMER_PRODUCTS = 'CONSUMER_PRODUCTS'
    GENERAL_USE_PRODUCTS = 'GENERAL_USE_PRODUCTS'

    TYPE_PRODUCT = (
        (FIXED_ASSETS, _('ATIVOS FIXOS')),
        (CONSUMER_PRODUCTS, _('PRODUTOS DE CONSUMO')),
        (GENERAL_USE_PRODUCTS, _('PRODUTOS DE USO GERAL')),
    )

    PACKAGES = 'PACKAGES' #paquetes
    UNITS = 'UNITS' #unidades
    BUNDLES = 'BUNDLES' #bultos
    MEASUREMENT_UNITS = (
        (PACKAGES, _('PACOTE')),
        (UNITS, _('UNIDADES')),
        (BUNDLES, _('FARDOS')),
    )

    name = models.CharField(max_length=80, null=False, blank=False, verbose_name=_('Nome'))
    manage_inventory = models.BooleanField(null=False, blank=False, verbose_name=_('Gerenciar stock?'))
    type = models.CharField(max_length=20, null=False, blank=False, choices=TYPE_PRODUCT,
                            verbose_name=_('Tipo de produto'))
    measurements_units = models.CharField(max_length=20, null=False, blank=False, choices=MEASUREMENT_UNITS,
                                          verbose_name=_('Unidade de medida'))
    lang = models.CharField(max_length=5)  # lenguaje
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        verbose_name = _('Produto')
        verbose_name_plural = _('Produtos')


class Meta:
    verbose_name = _('Material ou Equipamento')
    verbose_name_plural = _('Materiales ou Equipamentos')
    ordering = ['name']


class Inventory(SoftDeleteModel):
    material_equipment = models.ForeignKey(Product, related_name='inventory_product',
                                           on_delete=models.PROTECT)
    quantity = models.IntegerField(null=False, blank=False, )
    church = models.ForeignKey(Church, related_name='inventory_church', on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('inventário')
        verbose_name_plural = _('inventário')


class Purchase(SoftDeleteModel):
    church = models.ForeignKey(Church, related_name='shopping_church', on_delete=models.PROTECT)
    provider = models.CharField(max_length=100, null=False, blank=False,
                                help_text=_('Nome da loga ou empresa'),
                                verbose_name=_('Fornecedor'))
    provider_register_number = models.CharField(null=False, blank=False, max_length=50, verbose_name=_('CNPJ'))
    payment_value = models.DecimalField(null=False, blank=False, max_digits=10, decimal_places=2,
                                        verbose_name=_('Valor total pago'))
    freight_value = models.DecimalField(null=False, blank=False, max_digits=10, decimal_places=2,
                                        verbose_name=_('Valor do frete'))
    purchase_date = models.DateField(null=False, blank=False, verbose_name=_('Data da compra'))
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Compra')
        verbose_name_plural = _('Compras')


class PurchaseDetail(SoftDeleteModel):
    purchase = models.ForeignKey(Purchase, related_name='purchase_detail_Purchase', on_delete=models.CASCADE)
    material_equipment = models.ForeignKey(Product, related_name='purchase_detail_product',
                                           on_delete=models.PROTECT)
    quantity = models.IntegerField(null=False, blank=False, )
    value_per_unit = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=_('Valor Unit.'))


class DisincorporateProduct(SoftDeleteModel):
    material_equipment = models.ForeignKey(Product, related_name='disincorporate_product_product',
                                           on_delete=models.PROTECT)
    quantity = models.IntegerField(null=False, blank=False, verbose_name=_('Quantidade'))
    reason = models.TextField(null=False, blank=False, verbose_name='')
