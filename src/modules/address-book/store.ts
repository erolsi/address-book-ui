import api, { Paged } from 'api';
import { User } from 'modules/address-book/types';
import { message } from 'antd';
import { isNil } from 'lodash';
import { makeAutoObservable, runInAction, observable, computed, action } from 'mobx';
import { range } from 'lodash';

export interface AddressBookState {
  users: UserState[];
  loading: boolean;
  query: string | null;
  page: number;
}

export interface UserState extends User {
  loading: boolean;
}

export class AddressBookStore implements AddressBookState {
  users: UserState[] = [];
  loading: boolean = true;
  query: string | null = null;
  page: number = 1;

  /**
   * Computed value of users either filtered by query or all if search is not active
   */
  get visibleUsers() {
    const query = this.query;

    return isNil(query) ? this.users : this.users.filter((u) => `${u.name.first} ${u.name.last}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  }

  constructor() {
    makeAutoObservable(this, {
      users: observable,
      loading: observable,
      query: observable,
      load: action,
      search: action,
      visibleUsers: computed
    });

    this.users = this.generateBlankUsers();
  }

  /**
   * Generate blank users to indicate loading animation. We limit to 50 users, which is same as page size.
   */
  generateBlankUsers() {
    return range(50).map((i) => ({ email: i.toFixed(), name: { first: '', last: '', username: '' }, picture: { large: '', thumbnail: '' }, loading: true }));
  }

  /**
   * Load users using API.
   */
  load() {
    this.loading = true;

    (async () => {
      try {
        // simulate server delay, so we can see the animation
        await new Promise((resolve) => setTimeout(resolve, 500));

        const nationality = localStorage.getItem('nationality');
        const response = await api.get<Paged<User>>('', { params: { page: this.page, results: 50, nat: nationality } });

        // we use email as key for loop, so we need to make sure we dont have duplicates
        const keys = this.users.map((user) => user.email);
        runInAction(() => {
          this.users = [
            ...this.users.filter((user) => !user.loading),
            ...response.data.results.filter((user) => !keys.includes(user.email)).map((user) => ({ ...user, loading: false }))
          ];
          this.loading = false;
        });
      } catch (e) {
        message.error('Error loading, please try again');
      }
    })();
  }

  /**
   * Load next page by incrementing current page number.
   * Loading next page is possible if
   * - not already loading, and
   * - is less than 1000 records, and ž
   * - is not searching
   */
  loadNextPage() {
    if (!this.loading && this.page <= 20 && !this.query) {
      this.page++;
      this.users = [...this.users, ...this.generateBlankUsers()];
      this.load();
    }
  }

  /**
   * Search users by checking if first and last name includes query.
   *
   * @param query Query to search
   */
  search(query: string) {
    this.loading = true;
    this.users = this.users.map((user) => ({ ...user, loading: true }));

    // simulate server delay
    setTimeout(() => {
      runInAction(() => {
        this.query = query;
        this.loading = false;
        this.users = this.users.map((user) => ({ ...user, loading: false }));
      });
    }, 500);
  }

  /**
   * Reset the store to initial state.
   */
  reset() {
    this.query = null;
    this.users = this.generateBlankUsers();
    this.loading = true;
    this.page = 1;
  }
}

const store = new AddressBookStore();

export default store;
