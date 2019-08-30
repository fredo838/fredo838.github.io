import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import { LoginButton } from './LoginButton'

class TensorflowJsModel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videoTag: React.createRef(),
            canvasTag: React.createRef(),
            loginButtonRef: React.createRef(),
            width: 50,
            height: 50,
            predictionResult: null,
            isPredicting: null,
            model: null,
            loadingModel: false,
            modelLoaded: false
        };
    }

    componentDidMount = () => {
        navigator.mediaDevices
        .getUserMedia({video: {facingMode: "environment"}})
        .then(stream => {
            this.setState(prevState => {
                let videoTag = Object.assign({}, prevState.videoTag)
                videoTag.current.srcObject = stream


                videoTag.current.onplay = () => {this.setState({
                    width: this.state.videoTag.current.videoWidth,
                    height: this.state.videoTag.current.videoHeight,

                })}


                return { videoTag };
            })
          })
        .catch(console.log);
        this.mainLoop();
    }

    predict = async (inputData) => {
        if (this.state.modelLoaded) {
            await tf.tidy( () => {
                return this.state.model.predict(
                    tf.sub(1, tf.mul(2, tf.div(tf.browser.fromPixels(inputData), 255)),1)
                     .resizeNearestNeighbor([224,224])
                     .toFloat()
                     .expandDims()
                     )
                   }
                ).data()
                 .then(data => { this.setState({predictionResult: data}) })
             }
    }

    mainLoop = () => {
        this.state.canvasTag.current.getContext('2d').drawImage(this.state.videoTag.current, 0, 0);
        const inputData = this.state.canvasTag.current.getContext('2d')
                          .getImageData(0,0, this.state.canvasTag.current.width, this.state.canvasTag.current.height)
        this.predict(inputData)
        requestAnimationFrame(this.mainLoop)
    }

    initializeModel = async () => {
        this.setState({loadingModel: true})
        const modelAPI = "https://grass-detector-models.storage.googleapis.com/model_8/model.json"
        const model = await tf.loadLayersModel(modelAPI+"?access_token="+this.state.loginButtonRef.current.getAccessToken())
        this.setState({model: model, loadingModel: false, modelLoaded: true})
    }


    render = () => {
      return (
        <div>
          <div className="uk-flex uk-flex-center">
            <video
              hidden
              ref={this.state.videoTag}
              autoPlay>
            </video>
          </div>
          <div className="uk-flex uk-flex-center">
            <canvas
              style={{ "borderStyle": "solid" }}
              ref={this.state.canvasTag}
              width={this.state.width}
              height={this.state.height}>
            </canvas>
          </div>
          <div className="uk-flex uk-flex-center uk-padding-small">
            <LoginButton ref={this.state.loginButtonRef} postProcess={this.initializeModel}></LoginButton>
          </div>
          {(this.state.loadingModel) ?
           (<div className="uk-flex uk-flex-center">
              <div className="uk-spinner" uk-spinner="ratio : 3"></div>
            </div>) :
           (<div></div>)
          }
          <div className="uk-flex uk-flex-center">
            <div>
                {this.state.predictionResult}
            </div>
          </div>
        </div>
        )
      }
    }

export { TensorflowJsModel }

