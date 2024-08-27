import "./PostIdeaPage.css";
import "react-quill/dist/quill.snow.css";

import { useForm, Controller } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";

import { createIdea } from "../../Redux/api/ideaAPI";
import { useNavigate } from "react-router-dom";

const PostIdeaPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { verticals, functions, users, tags } = useSelector((state) => state.common);

  const { control, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    data["isActive"] = true;

    if (data.coauthors.length > 0) {
      const selectedUserIds = users.filter((user) => data.coauthors.includes(user.name)).map((user) => user._id);

      data.coauthors = selectedUserIds;
    }

    await dispatch(createIdea(data));
    navigate(`/ideas`);
    reset();
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["code-block"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div className="post-idea-page">
      <h1>Post Your Idea</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-row">
          <div className="card" style={{ width: "30%" }}>
            <FormControl fullWidth margin="normal" className="flex-item">
              <InputLabel>Idea Vertical</InputLabel>
              <Controller
                name="ideaVerticalId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} label="Idea Vertical" inputProps={{ id: "ideaVerticalId" }}>
                    {verticals.map((vertical) => (
                      <MenuItem key={vertical._id} value={vertical._id}>
                        {vertical.verticalName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>

          <div className="card">
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Synopsis"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={1}
                  className="flex-item flex-grow"
                />
              )}
            />
          </div>
        </div>

        {["problemStatement", "advantage", "proposedSolution", "existingSolution"].map((field) => (
          <div className="quill-wrapper card" key={field}>
            <div className="quill-custom-label">
              <InputLabel>{field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</InputLabel>
            </div>
            <Controller
              name={field}
              control={control}
              defaultValue=""
              render={({ field }) => <ReactQuill {...field} modules={modules} theme="snow" className="quill-editor" />}
            />
          </div>
        ))}

        <div className="flex-row">
          <div className="card">
            <FormControl fullWidth margin="normal" className="flex-item">
              <InputLabel>Team</InputLabel>
              <Controller
                name="functionId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} label="Team">
                    {functions.map((func) => (
                      <MenuItem key={func._id} value={func._id}>
                        {func.functionName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
        </div>

        <div className="flex-row">
          <div className="card">
            <FormControl fullWidth margin="normal" className="flex-item">
              <InputLabel id="demo-multiple-name-label">Co-Authors/SME</InputLabel>
              <Controller
                name="coauthors"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Co-Authors/SME"
                    multiple
                    onChange={(e) => setValue(field.name, e.target.value)}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {users.map((author) => (
                      <MenuItem key={author._id} value={author.name}>
                        {author.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
          <div className="card">
            <FormControl fullWidth margin="normal" className="flex-item">
              <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    freeSolo
                    options={tags.map(tag => tag.name)}
                    value={field.value}
                    onChange={(event, newValue) => setValue(field.name, newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        variant="outlined"
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          </div>
        </div>

        <div className="form-actions card">
          <Button type="submit" variant="contained" color="primary">
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostIdeaPage;
