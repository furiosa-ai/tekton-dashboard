/*
Copyright 2019-2021 The Tekton Authors
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as CarbonLink, Row, Column } from 'carbon-components-react';

const predefinedParams = ['logs', 'pod-resource-usage'];

function Links({ params }) {
  const links = params.filter(({ name, value }) => predefinedParams.includes(name));

  return links.map(({ name, value }) => {
    return (
      <>
        <Column sm={3} md={3} lg={3}>{name}:</Column>
        <Column sm={9} md={9} lg={9}>
          <CarbonLink href={value} target="_blank">{value}</CarbonLink>
        </Column>
        <Column sm={16} md={16} lg={16}>
          <br />
        </Column>
      </>
    );
  });
}

function CustomLink({
  className,
  dark,
  params,
  title
}) {
  const clz = classNames('bx--snippet--multi', className, {
    'tkn--view-yaml--dark': dark
  });
  return (
    <div className={clz}>
      <Row>
        <Links params={params} />
      </Row>
    </div>
  );
}

CustomLink.propTypes = {
  params: PropTypes.array,
};

CustomLink.defaultProps = {
  params: [],
};

export default CustomLink;
