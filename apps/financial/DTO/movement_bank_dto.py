from apps.financial.models import Bank


class MovementBankDTO:
    _bank = None
    _movement_type = ""
    _amount = 0.0
    _description = ""

    def __init__(self, bank: Bank, amount: float, movement_type: str, description: str):
        self._bank = bank
        self._movement_type = movement_type
        self._amount = amount
        self._description = description

    @property
    def amount(self):
        return self._amount

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
