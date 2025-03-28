import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { fetchProductQuery } from "@/customHooks/query/cms.query.hooks";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data: product, isLoading, isError } = fetchProductQuery(id as string);

  if (isLoading)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(30,30,30,0.95))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          p: { xs: 2, sm: 3 },
        }}
      >
        <CircularProgress sx={{ color: "#fff" }} />
      </Box>
    );

  if (isError)
    return (
      <Typography align="center" sx={{ mt: 5, color: "#fff" }}>
        Failed to load product details.
      </Typography>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(30,30,30,0.95))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        p: { xs: 2, sm: 3 },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper
          sx={{
            p: { xs: 2, sm: 4 },
            width: { xs: "90%", sm: 500 },
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.9)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#fff",
              mb: 2,
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            Product Details
          </Typography>
          {product?.image && (
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
          )}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#fff", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          >
            {product?.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "#ccc" }}>
            Description: {product?.description}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: 1,
              color: "#FACC15",
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            Category: {product?.category}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              color: "green",
              fontWeight: "bold",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            ${product?.price}
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              onClick={() => router.push("/cms/list")}
              sx={{
                fontSize: { xs: 14, sm: 16 },
                px: { xs: 2, sm: 3 },
                py: { xs: 0.8, sm: 1 },
                backgroundColor: "#333",
                "&:hover": { backgroundColor: "#555" },
              }}
            >
              Back to List
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
