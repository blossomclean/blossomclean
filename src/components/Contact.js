import React from 'react';
import AutoComplete from 'react-google-autocomplete';

const Contact = ({
  data,
  errors,
  handleChange,
  handleSelection,
  emailReadOnly,
}) => {
  return (
    <>
      <div className="input-group">
        <input
          type="text"
          name="firstName"
          value={data.firstName || ''}
          onChange={handleChange('firstName')}
          className={`form-control ${errors.firstName && 'input-error'}`}
          placeholder="First Name*"
          required
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}
      </div>
      <div className="input-group">
        <input
          type="text"
          name="lastName"
          value={data.lastName || ''}
          onChange={handleChange('lastName')}
          className={`form-control ${errors.lastName && 'input-error'}`}
          placeholder="Last Name*"
          required
        />
        {errors.lastName && <div className="error">{errors.lastName}</div>}
      </div>
      <div className="input-group">
        <input
          type="email"
          name="email"
          value={data.email || ''}
          onChange={handleChange('email')}
          className={`form-control ${errors.email && 'input-error'}`}
          placeholder="Email*"
          required
          readOnly={emailReadOnly}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="input-group">
        <input
          type="text"
          name="phone"
          value={data.phone || ''}
          onChange={handleChange('phone')}
          className={`form-control ${errors.phone && 'input-error'}`}
          placeholder="Phone*"
          required
        />
        {errors.phone && <div className="error">{errors.phone}</div>}
      </div>
      <div className="input-group">
        <AutoComplete
          name="address"
          className={`form-control`}
          value={data.address || ''}
          onChange={handleChange('address')}
          apiKey={process.env.GOOGLE_PLACES_API_KEY}
          onPlaceSelected={handleSelection('address')}
          options={{
            types: ['geocode'],
            componentRestrictions: { country: 'au' },
          }}
        />
      </div>
    </>
  );
};

export default Contact;
