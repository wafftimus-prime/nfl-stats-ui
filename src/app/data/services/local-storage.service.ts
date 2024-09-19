import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  // -----------------------------------------------------------------------------------------------------
  // @ Public variables
  // -----------------------------------------------------------------------------------------------------
  databases: { [key: string]: BehaviorSubject<{ last_update: string | null, data: any[] }> } = {}

  getDatabase(db_name: string) {
    if (!this.databases[db_name]?.value) {
      this.setData(db_name, { last_update: null, data: [] })
    }

    return this.databases[db_name]?.value
  }

  setData(db_name: string, data: any): void {
    this.databases[db_name] = new BehaviorSubject(JSON.parse(localStorage.getItem(db_name) || JSON.stringify(data)));


    this.databases[db_name].asObservable()
      .subscribe(db => localStorage.setItem(db_name, JSON.stringify(db)));
  }

  // loadData(db_name: string, typename?: string): Promise<any[]> {
  //   let data;
  //   if (typename) data = this.getDatabase(db_name)?.filter(d => d?.typename === typename)
  //   else data = this.getDatabase(db_name)
  //   return Promise.resolve(data)
  // }

  /** Looks to replace the item if it exits and adds it if it doesnt */
  // updateDbItem(db_name: string, item: any) {
  //   const db = cloneDeep(this.getDatabase(db_name))

  //   const index = db.findIndex(i => i.id === item.id && i.typename === item.typename)

  //   db.splice(index, index === -1 ? 0 : 1, item);

  //   this.databases[db_name].next(db)

  //   return Promise.resolve(item)
  // }

  // deleteDbItem(db_name: string, item: any) {
  //   const db = cloneDeep(this.getDatabase(db_name))

  //   if (db.findIndex(i => i.id === item.id && i.typename === item.typename) !== -1)
  //     db.splice(db.findIndex(i => i.id === item.id && i.typename === item.typename), 1);

  //   this.databases[db_name].next(db)

  //   return Promise.resolve(item)
  // }

  // getDbItem(db_name: string, id: string, typename: string) {
  //   const dbItem = this.getDatabase(db_name)?.find(i => i?.id === id && i?.typename === typename)
  //   return Promise.resolve(dbItem)
  // }

  // retrieveDbItem(db_name: string, id: string, typename: string) {
  //   const dbItem = this.getDatabase(db_name)?.find(i => i.id === id && i.typename === typename)
  //   return dbItem
  // }

}
