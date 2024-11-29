import { Router } from 'express';
import { verifyToken } from '../middlewares/AuthMiddleware.js'
import { getAllContacts, getContactsForDmList, searchContacts } from '../controllers/ContactsController.js';

const contactsRoute = Router();

contactsRoute.post("/search", searchContacts);
contactsRoute.get("/get-contacts-for-dm", verifyToken, getContactsForDmList);
contactsRoute.get("/get-all-contacts", verifyToken, getAllContacts);

export default contactsRoute;