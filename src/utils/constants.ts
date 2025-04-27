export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

interface TCategoryColor { 
    [category: string]: string
}

interface TInputErrorsMessage {
    [error: string]: string
}

export const cardCategoryColor: TCategoryColor = {
    'софт-скил': 'card__category_soft',
    'хард-скил': 'card__category_hard',
    'другое': 'card__category_other',
    'дополнительное': 'card__category_additional',
    'кнопка': 'card__category_button'
};

export const inputErrorsMessage: TInputErrorsMessage = {
    'address': 'Необходимо указать адрес',
    'email': 'Необходимо указать email',
    'phone': 'Необходимо указать телефон'
};