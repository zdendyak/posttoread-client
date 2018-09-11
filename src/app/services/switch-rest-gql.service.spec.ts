import { TestBed, inject } from '@angular/core/testing';

import { SwitchRestGqlService } from './switch-rest-gql.service';

describe('SwitchRestGqlService', () => {
  let switchService: SwitchRestGqlService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwitchRestGqlService]
    });

    switchService = TestBed.get(SwitchRestGqlService);
  });

  it('should be created', () => {
    expect(switchService).toBeTruthy();
  });

  it('should return initial value true', () => {
    let rest;
    
    switchService.useRest$.subscribe(res => {
      rest = res;
    });

    expect(rest).toEqual(true);
  });
});
