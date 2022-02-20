import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Component, Host, Inject, Injectable, Injector, Self, StaticProvider} from "@angular/core";

//
// @Component({
//
// })
@Injectable()
class Car {
  name='regular car';
  constructor(@Inject(Engine) private engine) {
  }
}

@Injectable()
class SelfConstrainedCar {
  constructor(@Self() private engine: Engine) {
  }
}
@Injectable()
class HostConstrainedCar {
  constructor(@Host() private engine: Engine) {
  }
}
@Injectable()
class Engine {
  name= 'regular engine';
}

@Injectable()
class TurboEngine {
name= 'turbo';
}

describe('AppComponent', () => {

  it('basic injection', () => {
    let inj: Injector = Injector.create({
      providers: [
        {provide: Car, deps: [Engine]},
        {provide: Engine}
      ]
    });

    let car = inj.get(Car);
    expect(car).toBeDefined();
    expect(inj.get(Engine)).toBeInstanceOf(Engine);
    expect(() => inj.get(TurboEngine)).toThrowError();
  });

  it('parent/child injectors', () => {
    let parent: Injector = Injector.create({
      providers: [
        {provide: Engine, useClass: TurboEngine}
      ],
      name: 'parent-injector'
    });
    let child: Injector = Injector.create({
      providers: [{provide: Car, deps: [Engine]}], parent: parent, name: 'child-injector'
    });


    let car = child.get(Car);
    expect(car).toBeDefined();
    expect(parent.get(Engine)).toBeInstanceOf(TurboEngine);
    expect(() => parent.get(Car)).toThrowError();
    expect(child.get(Engine)).toBeInstanceOf(TurboEngine);
  });


  it('@self constraint injector should only look in Injector where Car is defined', () => {
    let parent: Injector = Injector.create({
      providers: [
        {provide: Engine, useClass: TurboEngine},
      ]
    });
    let child: Injector = Injector.create({
      providers: [{provide: SelfConstrainedCar}], parent: parent
    });
    let childTwo: Injector = Injector.create({
      providers: [{provide: HostConstrainedCar}], parent: parent
    });

    expect(() => child.get(SelfConstrainedCar)).toThrowError();
    expect(childTwo.get(HostConstrainedCar)).toBeInstanceOf(HostConstrainedCar);
  });


  it('Transient dependencies', () => {
    let parent: Injector = Injector.create({
      providers: [
        {provide: Engine, useClass: TurboEngine},
      ]
    });
    let childUsingSingleton: Injector = Injector.create({
      providers: [{provide: Car }], parent: parent
    });
    let childUsingFactory: Injector = Injector.create({
      providers: [{provide: 'CarFactory', useFactory: e => ()=> {return new Car(e)}, deps:[Engine]}], parent: parent
    });

    var factory = childUsingFactory.get('CarFactory');
    var instance1 = factory();
    var instance2 = factory();
    expect(instance1).not.toBe(instance2);

    let sIns1 = childUsingSingleton.get(Car);
    let sIns2 = childUsingSingleton.get(Car);
    expect(sIns1).toBe(sIns2);

  });
});
