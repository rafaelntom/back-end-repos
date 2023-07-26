# Crie um arquivo na raiz do projeto chamado de exceptions.py, onde você deverá criar algumas exceções personalizadas:

# NegativeTitlesError: cuja mensagem deverá ser "titles cannot be negative".
# InvalidYearCupError: que deverá ter a mensagem "there was no world cup this year".
# ImpossibleTitlesError: onde a mensagem deve ser "impossible to have more titles than disputed cups".

class NegativeTitlesError(Exception):
    def __init__(self, message) -> None:
        self.message = message


class InvalidYearCupError(Exception):
    def __init__(self, message) -> None:
        self.message = message


class ImpossibleTitlesError(Exception):
    def __init__(self, message) -> None:
        self.message = message
