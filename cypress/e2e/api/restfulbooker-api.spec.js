
// Restful Booker API Test Suite
// Positive and negative test cases for Auth, Booking, and Health endpoints

let restfulAPIData;
before(() => {
    cy.fixture('restfulAPIData').then((data) => {
        restfulAPIData = data;
    });
});

describe('Restful Booker API', () => {

    // Auth - CreateToken
    describe('Auth - CreateToken', () => {
        it('should return a token for valid credentials (positive)', () => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request({
                    method: 'POST',
                    url: `${apiUrl}/auth`,
                    body: restfulAPIData.validAuth,
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('token');
                });
            })
        });

        it('should fail for invalid credentials (negative)', () => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request({
                    method: 'POST',
                    url: `${apiUrl}/auth`,
                    body: restfulAPIData.invalidAuth,
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(200); // API returns 200 with reason for failure
                    expect(response.body).to.have.property('reason');
                });
            });
        });
    });

    // Booking - CreateBooking
    describe('Booking - CreateBooking', () => {
        it('should create a booking with valid data (positive)', () => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request('POST', `${apiUrl}/booking`, restfulAPIData.validBooking).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('bookingid');
                    expect(response.body.booking).to.include({ firstname: restfulAPIData.validBooking.firstname, lastname: restfulAPIData.validBooking.lastname });
                });
            });
        });

        it('should fail to create booking with missing required fields (negative)', () => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request({
                    method: 'POST',
                    url: `${apiUrl}/booking`,
                    body: restfulAPIData.invalidBooking,
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.be.oneOf([400, 500]);
                });
            });
        });
    });

    // Booking - GetBookingIds & GetBooking
    describe('Booking - GetBookingIds & GetBooking', () => {
        it('should return a list of booking ids (positive)', () => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request('GET', `${apiUrl}/booking`).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.be.an('array');
                    if (response.body.length > 0) {
                        expect(response.body[0]).to.have.property('bookingid');
                    }
                });
            });
        });

        it('should return 404 for non-existent booking id (negative)', () => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request({
                    method: 'GET',
                    url: `${apiUrl}/booking/999999`,
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(404);
                });
            });
        });
    });

    // Booking - UpdateBooking (positive/negative)
    describe('Booking - UpdateBooking', () => {
        let bookingId;
        let token;
        before(() => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                // Create a booking and get token
                cy.request('POST', `${apiUrl}/auth`, restfulAPIData.validAuth).then((res) => {
                    token = res.body.token;
                });
                cy.request('POST', `${apiUrl}/booking`, restfulAPIData.validBooking).then((res) => {
                    bookingId = res.body.bookingid;
                });
            });
        });

        it('should update a booking with valid token (positive)', () => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request({
                    method: 'PUT',
                    url: `${apiUrl}/booking/${bookingId}`,
                    headers: { Cookie: `token=${token}` },
                    body: restfulAPIData.updateBooking
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.totalprice).to.eq(restfulAPIData.updateBooking.totalprice);
                    expect(response.body.depositpaid).to.eq(restfulAPIData.updateBooking.depositpaid);
                });
            });
        });

        it('should fail to update booking with invalid token (negative)', () => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request({
                    method: 'PUT',
                    url: `${apiUrl}/booking/${bookingId}`,
                    headers: { Cookie: 'token=invalidtoken' },
                    body: restfulAPIData.updateBookingInvalid,
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.be.oneOf([403, 401]);
                });
            });
        });
    });

    // Booking - DeleteBooking (positive/negative)
    describe('Booking - DeleteBooking', () => {
        let bookingId;
        let token;
        before(() => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request('POST', `${apiUrl}/auth`, restfulAPIData.validAuth).then((res) => {
                    token = res.body.token;
                });
                cy.request('POST', `${apiUrl}/booking`, restfulAPIData.deleteBooking).then((res) => {
                    bookingId = res.body.bookingid;
                });
            });
        });

        it('should delete a booking with valid token (positive)', () => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request({
                    method: 'DELETE',
                    url: `${apiUrl}/booking/${bookingId}`,
                    headers: { Cookie: `token=${token}` }
                }).then((response) => {
                    expect([200, 201, 204]).to.include(response.status);
                });
            });
        });

        it('should fail to delete booking with invalid token (negative)', () => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request({
                    method: 'DELETE',
                    url: `${apiUrl}/booking/${bookingId}`,
                    headers: { Cookie: 'token=invalidtoken' },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.be.oneOf([403, 401]);
                });
            });
        });
    });

    // Ping - HealthCheck
    describe('Ping - HealthCheck', () => {
        it('should return 201 if API is up (positive)', () => {
            cy.env(['apiUrl']).then(({ apiUrl }) => {
                cy.request('GET', `${apiUrl}/ping`).then((response) => {
                    expect(response.status).to.eq(201);
                });
            });
        });

    });
});
