import React from 'react'
import '../style/home.css'

const Home = () => {
  return (
    <>
      <div className=" home container-fluid d-flex align-items-center mx-auto m-3">
        <div className="col-md-12 ">
          <div className="row no-gutter">
            <div className="col-xl-3 col-lg-6">
              <div className="card-home l-bg-cherry">
                <div className="card-home-statistic-3 p-4">
                  <div className="card-home-icon card-home-icon-large"><i class="fas fa-money-check-alt"></i></div>
                  <div className="mb-4">
                    <h5 className="card-home-title mb-0">Total Transaction</h5>
                  </div>
                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        24
                      </h2>
                    </div>
                    <div className="col-4 text-right">
                      <span>50% <i className="fa fa-arrow-up"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6">
              <div className="card-home l-bg-blue-dark">
                <div className="card-home-statistic-3 p-4">
                  <div className="card-home-icon card-home-icon-large"><i className="fas fa-users"></i></div>
                  <div className="mb-4">
                    <h5 className="card-home-title mb-0">Customers</h5>
                  </div>
                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        5
                      </h2>
                    </div>
                    <div className="col-4 text-right">
                      <span>25% <i className="fa fa-arrow-up"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6">
              <div className="card-home l-bg-green-dark">
                <div className="card-home-statistic-3 p-4">
                  <div className="card-home-icon card-home-icon-large"><i className="fas fa-dollar-sign"></i></div>
                  <div className="mb-4">
                    <h5 className="card-home-title mb-0">Revenue</h5>
                  </div>
                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        Rs.116255
                      </h2>
                    </div>
                    <div className="col-4 text-right">
                      <span>40% <i className="fa fa-arrow-up"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6">
              <div className="card-home l-bg-orange-dark">
                <div className="card-home-statistic-3 p-4">
                  <div className="card-home-icon card-home-icon-large"><i class="fas fa-chart-line"></i></div>
                  <div className="mb-4">
                    <h5 className="card-home-title mb-0">Growth</h5>
                  </div>
                  <div className="row align-items-center mb-2 d-flex">
                    <div className="col-8">
                      <h2 className="d-flex align-items-center mb-0">
                        100%
                      </h2>
                    </div>
                    <div className="col-4 text-right">
                      <span>100% <i className="fa fa-arrow-up"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </>
  )
}

export default Home