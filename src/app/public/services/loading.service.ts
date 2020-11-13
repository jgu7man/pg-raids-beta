import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject, Observable, Observer, BehaviorSubject, Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { filter, map, switchMap, first } from 'rxjs/operators';

@Injectable( { providedIn: 'root' } )
export class Loading {

    constructor (
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        
    }

    waitFor = (ms) => new Promise(r => setTimeout(r, ms))

    on$: any = false
    animation$: any = false

    turnOn( animation?: string ) {
        this.on$ = true
        this.animation$ = animation ? animation : ''
    }

    async turnOff( animation?: string ) {
        await this.waitFor(1000)
        this.animation$ = animation ? animation : ''
        await this.waitFor(1000)
        this.on$ = false
    }

    async asyncForEach( array: any[] | Map<number, any>, callback: any ) {
        if ( Array.isArray( array ) ) {
            for ( let index = 0; index < array.length; index++ ) {
                await callback( array[ index ], index, array );
            }
        } else {
            for ( let index = 0; index < array.size; index++ ) {
                await callback( array.get(index), index, array );
            }
        }
    }


    
    async waitForDataLoaded(
        ObservableElement: Subject<any> | BehaviorSubject<any>,
        autoUnsubscribe?: boolean
    ): Promise<DataLoaded>
    {
        var data: any
        var dataSubscription: Subscription
        
        // Set subscription
        var promise = new Promise( resolve => {
            dataSubscription =
                ObservableElement.subscribe( d => resolve( d ) )
        } )
        
        // Get the data
        data = await promise

        // Unsubscribe
        if ( autoUnsubscribe ) {
            promise.finally(() => dataSubscription.unsubscribe())
        }

        
        return {
            data,
            dataSubscription: autoUnsubscribe ? null: dataSubscription
        }
    }

    getCurrentActivatedRoute(): Observable<ActivatedRoute> {
        return this.router.events.pipe(
            filter( event => event instanceof NavigationEnd ),
            map( () => this.activatedRoute ),
            map( route => {
                while ( route.firstChild ) {
                    route = route.firstChild;
                }
                return route;
            } ),
            filter( route => route.outlet === 'primary' )
        ).pipe( )
    }

    getRouteParams(): Observable<Params> {
        return this.router.events.pipe(
            filter( event => event instanceof NavigationEnd ),
            map( () => this.activatedRoute ),
            map( route => {
                while ( route.firstChild ) {
                    route = route.firstChild;
                }
                return route;
            } ),
            filter( route => route.outlet === 'primary' )
        ).pipe(
            switchMap( ( route: ActivatedRoute ) => {
            return route.params
            } ),
            first()
        )
    }

    getRouteQueryParams(): Observable<Params> {
        return this.router.events.pipe(
            filter( event => event instanceof NavigationEnd ),
            map( () => this.activatedRoute ),
            map( route => {
                while ( route.firstChild ) {
                    route = route.firstChild;
                }
                return route;
            } ),
            filter( route => route.outlet === 'primary' )
        ).pipe( switchMap( ( route: ActivatedRoute ) => {
            return route.queryParams
        } ), first()
        )
    }

    
    


}

interface DataLoaded {
    data: any,
    dataSubscription?: Subscription
 }