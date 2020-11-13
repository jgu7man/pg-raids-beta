import {Injectable} from '@angular/core';
import { Observable, Subject, interval} from 'rxjs';
import { pluck, tap, distinctUntilKeyChanged, map, distinctUntilChanged,  startWith, take, skipWhile } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    cacheTagName: string = 'gdev-data'
    storage: 'local' | 'session' = 'session'
    updateChanges$: Subject<any> = new Subject()

    constructor () {}

    updateData<T>(key, value) {
        var storageData = JSON.parse(
            this.storage == 'local'
                ? localStorage.getItem(this.cacheTagName)
                : sessionStorage.getItem(this.cacheTagName)
        )


        if (storageData) {
            storageData[key] = value
            this.storage == 'local'
                ? localStorage.setItem(this.cacheTagName, JSON.stringify(storageData))
                : sessionStorage.setItem(this.cacheTagName, JSON.stringify(storageData))
        } else {
            storageData = {[key]: value}
            this.storage == 'local'
                ? localStorage.setItem(this.cacheTagName, JSON.stringify(storageData))
                : sessionStorage.setItem(this.cacheTagName, JSON.stringify(storageData))
        }

        this.updateChanges$.next(storageData)
        return this.updateChanges$.pipe(
            distinctUntilKeyChanged(key),
            pluck<any, T>(key),
            // tap(result => console.log('keyChange: ',result))
        )

    }


    listenForChanges<T>(key: string): Observable<T> {
        let data = this.getDataKey<T>(key)
        return this.updateChanges$.pipe(
            // tap(res => console.log(res)),
            startWith({[key]:data}),
            distinctUntilChanged((x,y) => x[key] !== y[key]),
            pluck<any, T>(key),
            // tap(res => console.log(res)),
        )
    }



    async getFullData() {
        var storageData =
            this.storage == 'local'
                ? JSON.parse(localStorage.getItem(this.cacheTagName))
                : JSON.parse(sessionStorage.getItem(this.cacheTagName))
        return storageData ? storageData : null
    }



    getDataKey<T>(key: string) {
        var storageData =
            this.storage == 'local'
                ? JSON.parse(localStorage.getItem(this.cacheTagName))
                : JSON.parse(sessionStorage.getItem(this.cacheTagName))
        if (storageData) {
            return storageData[key] ? storageData[key] as T : null
        } else {
            return null
        }
    }



    
    async getAsyncKey<T>(keyExpected: string, intervalsToWaitFor?: number, iterateSpeed?: number) {
        const timeToWait = interval(iterateSpeed ? iterateSpeed : 1000)  
        intervalsToWaitFor = intervalsToWaitFor ? intervalsToWaitFor : 5
        
        var result = this.getDataKey<T>(keyExpected) 
        // console.log(keyExpected, result);
        if (!result) {
            return new Promise<T>((resolve) => {

                
					timeToWait.pipe(
                        
                        map( (intent) => {
                            let result = this.getDataKey<T>(keyExpected)
                            // console.log(keyExpected, result)
					        return result ? result : intent
                        }),
                        skipWhile(result => {
                            // console.log({result, intervalsToWaitFor});
                            if( typeof result == 'number'  &&
                                result < intervalsToWaitFor
                            ) { return true} else {return false}
                            
                        }),
                        take(1),
					)
					.subscribe(result => {
						// console.log({ keyExpected, result, intervalsToWaitFor });
						if (result === intervalsToWaitFor) {
							// console.log('Se acabó el tiempo: ', keyExpected);
							resolve(null);
						} else if (typeof result != "number") {
							// {
							// console.log(keyExpected, result);
							resolve(result as T);
						}
						//}
                    }, error => console.log(error),
                    // () => {console.log(keyExpected, 'complete');}
                    );


            })
        } else {
            return result
        }
    }

  deleteDataKey(key: string) {
    var sesData =
      this.storage == 'local'
        ? JSON.parse(localStorage.getItem(this.cacheTagName))
        : JSON.parse(sessionStorage.getItem(this.cacheTagName))
    if (sesData) {
      delete sesData[key]

      this.storage == 'local'
        ? localStorage.setItem(this.cacheTagName, JSON.stringify(sesData))
        : sessionStorage.setItem(this.cacheTagName, JSON.stringify(sesData))
    }
  }

  
}




interface CacheData {
    key: string,
    value: any
}
