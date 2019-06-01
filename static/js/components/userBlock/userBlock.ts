'use strict';

import { MAP_OF_USER_BLOCKS } from '../constants';

import './userblock.scss';

export default class userBlock {
    changeButtons(statusText: String): boolean {
        const userButtons = document.getElementsByClassName('js-check-auth')[0];
        if (statusText === 'OK' || statusText === 'session is valid') {
            const toAdd = MAP_OF_USER_BLOCKS.get('isAuth block');
            userButtons.innerHTML = toAdd;
            return true;
        } else {
            const toAdd = MAP_OF_USER_BLOCKS.get('unAuth block');
            userButtons.innerHTML = toAdd;
            return false;
        }
    }

    changeButtonsBool(isAuth: Boolean) {
        const userButtons = document.getElementsByClassName('js-check-auth')[0];
        if (isAuth === true) {
            const toAdd = MAP_OF_USER_BLOCKS.get('isAuth block');
            userButtons.innerHTML = toAdd;
            return true;
        } else {
            const toAdd = MAP_OF_USER_BLOCKS.get('unAuth block');
            userButtons.innerHTML = toAdd;
            return false;
        }
    }

    gameButtons(data: { status?: String; user?: {nickname?: String}; }): boolean {
        const userButtons = document.getElementsByClassName('js-check-user')[0];
        if (data.status === 'authUser') {
            userButtons.innerHTML = `<a class="btn users__nickname login-btn">${data.user.nickname}</a><a class="btn users__btn signup-btn js-back-to-menu" href="/">Back</a>`;
            return true;
        } else {
            const toAdd = MAP_OF_USER_BLOCKS.get('inGame unAuth');
            userButtons.innerHTML = toAdd;
            return false;
        }
    }

    gameButtonsMulti(data: { user?: {first?: {nickname?: String}, second?: {nickname?: String}}; }): boolean {
        console.log('called');
        const userButtons = document.getElementsByClassName('js-check-user')[0];
        userButtons.innerHTML = `<a class="btn users__nickname login-btn">${data.user.first.nickname}</a><a class="btn users__nickname login-btn">${data.user.second.nickname}</a><a class="btn users__btn signup-btn js-back-to-menu" href="/">Back</a>`;
        return true;
    }
}