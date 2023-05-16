/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { PureComponent, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { meat_cuts } from './meat-cuts.js'; // The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled
// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

import { jsx as ___EmotionJSX } from "@emotion/react";
const Styles = styled.div`
  background-color: ${({
  theme
}) => theme.colors.secondary.light2};
  padding: ${({
  theme
}) => theme.gridUnit * 4}px;
  border-radius: ${({
  theme
}) => theme.gridUnit * 2}px;
  height: ${({
  height
}) => height};
  width: ${({
  width
}) => width};
  overflow-y: scroll;
`;
/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

/*	const handleChange = useCallback(
	(values: string[]) => {
	  if (!this.props.emitFilter) {
		return;
	  }

	  const groupbyValues = values.map(value => labelMap[value]);

	  setDataMask({
		extraFormData: {
		  filters:
			values.length === 0
			  ? []
			  : groupby.map((col, idx) => {
				  const val = groupbyValues.map(v => v[idx]);
				  if (val === null || val === undefined)
					return {
					  col,
					  op: 'IS NULL',
					};
				  return {
					col,
					op: 'IN',
					val: val as (string | number | boolean)[],
				  };
				}),
		},
		filterState: {
		  value: groupbyValues.length ? groupbyValues : null,
		  selectedValues: values.length ? values : null,
		},
	  });
	},
	[this.props.groupby, this.props.labelMap, this.props.setDataMask, this.props.selectedValues],
	);

	const eventHandlers: EventHandlers = {
	click: props => {
	  const { name } = props;
	  const values = Object.values(selectedValues);
	  if (values.includes(name)) {
		handleChange(values.filter(v => v !== name));
	  } else {
		handleChange([name]);
	  }
	},
	};	
	
*/

export default class MeatCuts extends PureComponent {
  constructor(...args) {
    super(...args);
    this.rootElem = /*#__PURE__*/createRef();
  }

  componentDidMount() {
    const root = this.rootElem.current;
    console.log('Plugin element', root);
    console.log('Plugin element', root.className);
    console.log("sliceID: ", this.props); //    meat_cuts(this.props.data, this.props.width, this.props.height, this.props.sliceId);	

    meat_cuts(this.props.data, this.props.firstColor, this.props.secondColor, this.props.thirdColor, this.props.titleName, this.props.titleText, this.props.width, this.props.height, '');
  }

  componentDidUpdate() {
    //alert('shouldComponentUpdate');
    console.log('componentDidUpdate', this.props); //	  meat_cuts(this.props.data, false, false, this.props.sliceId);

    meat_cuts(this.props.data, this.props.firstColor, this.props.secondColor, this.props.thirdColor, this.props.titleName, this.props.titleText, false, false, '');
    return true;
  }

  render() {
    // height and width are the height and width of the DOM element as it exists in the dashboard.
    // There is also a `data` prop, which is, of course, your DATA
    //console.log('Approach 1 props', this.props);
    const {
      data,
      height,
      width,
      groupby,
      labelMap,
      setDataMask,
      selectedValues
    } = this.props; //	var diagSlice = 'myDiagramDiv' + this.props.sliceId;

    var diagSlice = 'myDiagramDiv' + '';
    console.log("diagSlice:", diagSlice);
    console.log(data);
    return ___EmotionJSX(Styles, {
      ref: this.rootElem,
      height: height,
      width: width
    }, " ", ___EmotionJSX("h3", null, this.props.chartName), ___EmotionJSX("div", {
      id: diagSlice
    }, "Test block using charts"));
  }

}