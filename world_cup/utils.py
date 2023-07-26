from exceptions import NegativeTitlesError, InvalidYearCupError, ImpossibleTitlesError
from datetime import datetime, timedelta


def data_processing(dict: dict):
    CURRENT_YEAR = datetime.now().strftime("%Y")
    CUP_YEARS = [n for n in range(1930, int(CURRENT_YEAR), 4)]

    if "titles" in dict and "first_cup" in dict:
        recieved_year = int(dict["first_cup"][:4])
        allowed_titles = (int(CURRENT_YEAR) - recieved_year) // 4

        if recieved_year not in CUP_YEARS:
            raise InvalidYearCupError("there was no world cup this year")

        if dict["titles"] > allowed_titles:
            raise ImpossibleTitlesError(
                "impossible to have more titles than disputed cups")

        if dict["titles"] < 0:
            raise NegativeTitlesError("titles cannot be negative")


data = {
    "name": "França",
    "titles": -3,
    "top_scorer": "Zidane",
    "fifa_code": "FRA",
    "first_cup": "2000-10-18"
}

ok_data = {
    "name": "França",
    "titles": 0,
    "top_scorer": "Zidane",
    "fifa_code": "FRA",
    "first_cup": "2018-10-18"
}
