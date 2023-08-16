from apps.church.models import Church
from apps.financial.models import CostCenter, Bank, Concept


class DiayBookRecordDTO:
    _is_credit: bool = False
    _amount: float = 0.0
    _destination_movement: str = ""
    _cost_center: CostCenter = None
    _church: Church = None
    _bank: Bank = None
    _concept: Concept = None

    def __init__(self, is_credit: bool, amount: float, destination_movement: str, cost_center: CostCenter,
                 church: Church, bank: Bank, concept: Concept):
        self._bank = bank
        self._is_credit = is_credit
        self._church = church
        self._amount = amount
        self._concept = concept
        self._cost_center = cost_center
        self._destination_movement = destination_movement

    @property
    def is_credit(self):
        return self._is_credit

    @property
    def amount(self):
        return self._amount

    @property
    def destination_movement(self):
        return self._destination_movement

    @property
    def cost_center(self):
        return self._cost_center

    @property
    def church(self):
        return self._church

    @property
    def bank(self):
        return self._bank

    @property
    def concept(self):
        return self._concept
