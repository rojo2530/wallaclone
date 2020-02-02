import React from 'react';
import { shallow } from 'enzyme';
import DetailAdvert from './DetailAdvert';
import { FaSellcast, FaBuysellads, FaItalic } from 'react-icons/fa';

describe('DetailAdvert', () => {
  const  defaultProps = {
    loadAdvert: jest.fn(),
    isFetching: false,
    error: null,
    match: {
      params: 1
    },
    advert: {
      photo: '/images/prueba.png',
      name: 'prueba',
      price: 15,
      type: 'buy' ,
      tags: ['work']
    }
  }

  const render = props => shallow(<DetailAdvert {...defaultProps} {...props} />);
  let wrapper;

  beforeEach(() => {
    wrapper = render();
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('Should call to prop loadAdvert on ComponentDidMount', () => {
    const instance = wrapper.instance();
    const { loadAdvert } = defaultProps;
    const { match } = defaultProps; 
    instance.componentDidMount();
    expect(loadAdvert).toHaveBeenCalledWith(match.id);
  });
});