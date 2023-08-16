from apps.church.models import Church
from apps.financial.models import Bank


class MovementBankDTO:
    _bank: Bank = None
    _movement_type: str = ""
    _amount: float = 0.0
    _description: str = ""
    _church: Church = None

    def __init__(self, bank: Bank, amount: float, movement_type: str, description: str, church: Church):
        self._bank = bank
        self._movement_type = movement_type
        self._amount = amount
        self._description = description
        self._church = church

    @property
    def amount(self):
        return self._amount

    @property
    def church_id(self):
        return self._church

    @property
    def movement_type(self):
        return self._movement_type

    @property
    def amount(self):
        return self._amount

    @property
    def description(self):
        return self._description

    @property
    def bank(self) -> Bank:
        return self._bank
