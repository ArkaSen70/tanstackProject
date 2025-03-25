import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import toast from "react-hot-toast";
import { fetchProductQuery, updateMutation } from "@/customHooks/query/cms.query.hooks";
import { updateProps } from "@/typescript/cms.interface";
import { motion } from "framer-motion";

export default function UpdateProduct() {
  const router = useRouter();
  const { slug } = router.query;
  const id = slug as string;

  const { data: product, isLoading, isError } = fetchProductQuery(id);
  const { mutate, isPending } = updateMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<updateProps>();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("category", product.category);
      setValue("price", product.price);
    }
  }, [product, setValue]);

  const sendData = (data: updateProps) => {
    mutate(
      { id, ...data },
      {
        onSuccess: () => {
          toast.success("Product Updated!");
          router.push("/cms/list");
        },
        onError: () => toast.error("Failed to update product."),
      }
    );
  };

  if (isLoading)
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(30,30,30,0.95))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#fff" }} />
      </Box>
    );
  if (isError)
    return <Typography color="error">Failed to load product.</Typography>;

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(30,30,30,0.95))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Paper
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 450,
            backgroundColor: "rgba(0, 0, 0, 0.6)", // dark transparent background
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.9)", // heavy shadow
            borderRadius: 3,
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              color: "#fff",
              fontFamily: "'Roboto', sans-serif",
              letterSpacing: "0.05rem",
            }}
          >
            Update Product
          </Typography>
          <form onSubmit={handleSubmit(sendData)}>
            <TextField
              {...register("name", { required: true })}
              label="Name"
              fullWidth
              margin="normal"
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff" },
              }}
            />
            <TextField
              {...register("description", { required: true })}
              label="Description"
              fullWidth
              margin="normal"
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff" },
              }}
            />
            <TextField
              {...register("category", { required: true })}
              label="Category"
              fullWidth
              margin="normal"
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff" },
              }}
            />
            <TextField
              {...register("price", { required: true })}
              label="Price"
              fullWidth
              margin="normal"
              sx={{
                input: { color: "#fff" },
                label: { color: "#fff" },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isPending}
              sx={{
                mt: 2,
                backgroundColor: "#333",
                "&:hover": { backgroundColor: "#555" },
              }}
            >
              {isPending ? "Updating..." : "Update Product"}
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
}
