import {test as Base} from '@playwright/test';
import LoginPage from '../pages/login.page';

export const test = Base.extend<{
    login: LoginPage;}>({
        login:async({page},use) => await use(new LoginPage(page))
    })
