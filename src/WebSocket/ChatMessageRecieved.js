import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

export default ({ name, message, user }) =>


    <div style={{backgroundColor:"white", height:"100%"}} className="boxShadow">
    <div>

      <div style={{width:"100%"}}>
      <div style={{float:"right"}}>
      <Chip
        avatar={<Avatar>K</Avatar>}
        label="this is a message from another user"
        color="primary"
      />
      </div>
      </div>

      <div style={{width:"100%"}}>
      <div style={{float:"left"}}>
      <Chip
        label={message}
        color="gray"
      />
      </div>
      </div>

    </div>
    </div>
