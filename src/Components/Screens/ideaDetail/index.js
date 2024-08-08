import "./IdeaDetailsPage.css";

import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

import { getIdeaDetail } from "../../Redux/api/ideaAPI";
import moment from "moment-timezone";

const IdeaDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isFetchingIdeaDetail, idea, ideaAuditLogData } = useSelector((state) => state.idea);

  const fetchIdeaDetails = async () => {
    await dispatch(getIdeaDetail(id));
  };

  useEffect(() => {
    fetchIdeaDetails();
  }, [id]);

  console.log("Audit Log:", ideaAuditLogData);
  
  return isFetchingIdeaDetail ? (
    <div className="idea-details-page">Loading...</div>
  ) : (
    <div className="idea-details-page">
      <div className="idea-header">
        <div className="icon-container">
          <ShareIcon className="icon-share" />
          <EditIcon className="icon-edit" />
        </div>
      </div>
      <div className="idea-content">
        <div className="idea-synopsis">
          {idea?.title}
        </div>
        <div className="idea-details-grid">
      <div className="grid-item">
        <div><strong>Author:</strong> {idea?.createdBy.name}</div>
        <div><strong>Stage:</strong> {idea?.ideaStageId.stageName}</div>
        <div><strong>Category:</strong> {idea?.ideaCategoryId.categoryName}</div>
      </div>
      <div className="grid-item">
        <div><strong>Date Created:</strong> {moment(idea?.createdAt).format("DD-MM-YYYY")}</div>
        <div><strong>Presentable Date:</strong> {moment(idea?.presentableDate).format("DD-MM-YYYY")}</div>
        <div><strong>Private Idea:</strong> {idea?.isPrivate ? "Yes" : "No"}</div>
        <div><strong>Published:</strong> {idea?.published ? "Yes" : "No"}</div>
      </div>
      <div className="grid-item">
        <div><strong>Tags:</strong> {idea?.tags.join(", ")}</div>
        <div><strong>Co-Authors:</strong> {idea?.coauthors.map((coauthor) => coauthor.name).join(", ")}</div>
        <div><strong>Functions:</strong> {idea?.functionId.functionName}</div>
        <div><strong>Sub Divisions:</strong> {idea?.subdivisionId.subdivisionName}</div>
      </div>
      </div>
      <div className="details-section">
        <div className="details-box">
          <strong>Problem Statement:</strong>
          <div dangerouslySetInnerHTML={{ __html: idea?.problemStatement }} />
        </div>
        <div className="details-box">
          <strong>Advantages:</strong>
          <div dangerouslySetInnerHTML={{ __html: idea?.advantage }} />
        </div>
        <div className="details-box">
          <strong>Proposed Solution:</strong>
          <div dangerouslySetInnerHTML={{ __html: idea?.proposedSolution }} />
        </div>
        <div className="details-box">
          <strong>Existing Solution:</strong>
          <div dangerouslySetInnerHTML={{ __html: idea?.existingSolution }} />
        </div>
      </div>
      <div className="track-status-section">
      <h3 className="track-status-title">Idea Tracking Progress</h3>
      <div className="track-status-container">
          <div className="track-status-header">
            <div className="track-status-cell">Event</div>
            <div className="track-status-cell">Details</div>
            <div className="track-status-cell">Timestamps</div>
          </div>
            <div className="track-status-body">
              {ideaAuditLogData?.map((event, index) => (
                <div className="track-status-row" key={index}>
                  <div className="track-status-cell">{event.eventName}</div>
                  <div className="track-status-cell">{event.details}</div>
                  <div className="track-status-cell">{moment(event.createdAt).format("DD-MM-YYYY hh:mm:ss A")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="comments-separator"></div> {/* Horizontal line */}
        <h3>Comments</h3>
        <div className="comments-section">
          {idea?.comments?.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-text">
                <strong>{comment.author}:</strong> {comment.text}
              </div>
              <div className="comment-date">
                <em>{comment.date}</em>
              </div>
            </div>
          ))}
          <div className="comment-input">
            <TextField className="comment-textfield" label="Add a Comment" variant="outlined" multiline rows={2} />
            <Button variant="contained" color="primary">
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsPage;
