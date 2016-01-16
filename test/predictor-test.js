import {prepareResult} from '../src/predictor';
import Immutable from 'immutable';
import chai from 'chai';

chai.should();

describe('predictor', () => {

  it('prepareResult', () => {
    const result = prepareResult(Immutable.List());

    result.should.have.property('sum+o').that.is.an('array');
  });

});
