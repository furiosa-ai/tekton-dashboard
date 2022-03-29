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
import jsYaml from 'js-yaml';
import classNames from 'classnames';
import { Link as CarbonLink } from 'carbon-components-react';

const linkAnnotationPrefix = 'furiosa.ai.tekton.dev.link/';

function Links({ resource, className }) {
  if (!('metadata' in resource) || !('annotations' in resource['metadata'])) {
    return null;
  }

  const keys = resources['metadata']['annotations'].keys().filter(key => {
    return key.startsWith(linkAnnotationPrefix);
  });

  return keys.map(key => {
    const title = key.substring(linkAnnotationPrefix.length);
    const link = resources['metadata']['annotations'][key];
    return (
      <div className={className}>
        <CarbonLink href={link}>{title}</CarbonLink>
      </div>
    );
  });
}

function CustomLink({
  className,
  dark,
  resource,
  title
}) {
  const clz = classNames('bx--snippet--multi', className, {
    'tkn--view-yaml--dark': dark
  });
  let customLinkComponent;
  if (enableSyntaxHighlighting && typeof resource !== 'string') {
    customLinkComponent = <Links className={clz} resource={resource} />;
  } else {
    const yaml = jsYaml.dump(resource);
    customLinkComponent = <Links className={clz} resource={resource} />;
  }

  return (
    <>
      {customLinkComponent}
    </>
  );
}

CustomLink.propTypes = {
  resource: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({}),
    PropTypes.string
  ]).isRequired,
};

CustomLink.defaultProps = {
  resource: {},
};

export default CustomLink;
