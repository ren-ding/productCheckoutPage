import {fakeDatabase} from '../db/fakedatabase';

export const getPromotionCodeByCode = 
    (code) => fakeDatabase.promotionCodes.find(c=> c.code === code);

export const getPromotionDataByCode =
    (code) => fakeDatabase.promotionData.find(c=> c.code === code);