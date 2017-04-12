import React, { Component }from 'react'
import { connect } from 'react-redux'


export default
class Build extends Component {

  constructor (props) {
    super (props)
  }

  render() {

    return (
      <div className="build-blue">

        <div id="build2">

          <div id="build0">
          hi



            <p className="lower-mid">purr-uh-min

            <br/>
            <a href="http://github.com/sunnythere">github.com/sunnythere</a>
            <br/>
            <a href="http://linkedin.com/in/yawenalice">linkedin.com/in/yawenalice</a>
            <br/>
            <br/>
            If you like cats, you might like my instagram:
              <br/><a href="http://instagram.com/hyphenlowercase">instagram.com/hyphenlowercase</a>
            </p>

            <div id="build2a">

              <div id="build3">

                  {this.props.children}

              </div>
            </div>
          </div>

        </div>
      </div>

    )
  }
}
