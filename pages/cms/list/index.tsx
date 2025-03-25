import {
  Typography,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import SweetAlertComponent from "@/ui/sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { allProductsQuery, deleteMutation, updateMutation } from "@/customHooks/query/cms.query.hooks";
import { listProps } from "@/typescript/cms.interface";

export default function List() {
  const [page, setPage] = useState(1);
  const [isTableView, setIsTableView] = useState(false);
  const perPage = 10;  
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = allProductsQuery(page, perPage);
  const { mutate: deleteMutate } = deleteMutation();
  const { mutate: updateMutate, isPending: isUpdating } = updateMutation();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [editProduct, setEditProduct] = useState<listProps | null>(null);
  const router = useRouter();
  const products: listProps[] = data?.products || [];

  const handleDelete = () => {
    if (deleteId) {
      deleteMutate(deleteId, {
        onSuccess: () => {
          setModal(false);
          queryClient.invalidateQueries({ queryKey: ["LISTPRODUCTS"] });
          toast.success("Product deleted successfully!");
        },
        onError: () => toast.error("Failed to delete product."),
      });
    }
  };

  const handleUpdate = () => {
    if (!editProduct) return;
    updateMutate(editProduct, {
      onSuccess: () => {
        setEditProduct(null);
        queryClient.invalidateQueries({ queryKey: ["LISTPRODUCTS"] });
        toast.success("Product updated successfully!");
      },
      onError: () => toast.error("Failed to update product."),
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          background: 'linear-gradient(135deg, rgba(30,45,70,0.95), rgba(40,55,80,0.95))',
          padding: 4,
          overflow: "hidden",
        }}
      >
        {/* Decorative Background Art */}
        <Box
          sx={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)',
            zIndex: 1,
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)',
            zIndex: 1,
            borderRadius: "50%",
          }}
        />

        {/* Main Content */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ color: "#fff" }}>
            Product List
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={() => setIsTableView(!isTableView)} color="primary">
              {isTableView ? <GridViewIcon /> : <ViewListIcon />}
            </IconButton>
          </Box>

          <Box sx={{ maxWidth: "1300px", margin: "0 auto", padding: "0 16px" }}>
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress sx={{ color: "#fff" }} />
              </Box>
            ) : isError ? (
              <Typography align="center" variant="h6" color="error">
                Failed to load products.
              </Typography>
            ) : products.length > 0 ? (
              isTableView ? (
                <TableContainer
                  component={Paper}
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.8)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: "#fff" }}>Image</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Category</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Price</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>
                            <Box
                              component="img"
                              src="/dummy-image.png"
                              alt="dummy"
                              sx={{ width: 50, height: 50, borderRadius: 1 }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: "#fff" }}>{product.name}</TableCell>
                          <TableCell sx={{ color: "#FACC15", fontFamily: "monospace", fontWeight: "bold" }}>
                            Category: {product.category}
                          </TableCell>
                          <TableCell sx={{ color: "#FACC15", fontFamily: "monospace", fontWeight: "bold" }}>
                            Price: ${product.price}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="error"
                              onClick={() => {
                                setDeleteId(product._id);
                                setModal(true);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={() => setEditProduct(product)}>
                              <EditIcon />
                            </IconButton>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => router.push(`/cms/details/${product._id}`)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Grid container spacing={4}>
                  {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card
                          sx={{
                            background: "rgba(0, 0, 0, 0.5)",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0px 8px 20px rgba(0,0,0,0.8)",
                            borderRadius: 3,
                            height: "350px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            color: "#fff",
                            padding: 2,
                          }}
                        >
                          <Box
                            component="img"
                            src="/tianyi-ma-WiONHd_zYI4-unsplash.jpg"
                            alt="dummy"
                            sx={{
                              width: "100%",
                              height: 140,
                              objectFit: "cover",
                              borderRadius: 1,
                              mb: 2,
                            }}
                          />
                          <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                            <Typography gutterBottom variant="h6" fontWeight="bold">
                              {product.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#FACC15", fontFamily: "monospace", fontWeight: "bold" }}>
                              Price: ${product.price}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#FACC15", fontFamily: "monospace", fontWeight: "bold" }}>
                              Category: {product.category}
                            </Typography>
                          </CardContent>
                          <Box display="flex" justifyContent="center" gap={2} p={2}>
                            <IconButton
                              color="error"
                              onClick={() => {
                                setDeleteId(product._id);
                                setModal(true);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={() => setEditProduct(product)}>
                              <EditIcon />
                            </IconButton>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => router.push(`/cms/details/${product._id}`)}
                            >
                              View Details
                            </Button>
                          </Box>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              )
            ) : (
              <Typography align="center" width="100%" sx={{ color: "#fff" }}>
                No products found.
              </Typography>
            )}

            {modal && (
              <SweetAlertComponent
                confirm={handleDelete}
                cancle={() => setModal(false)}
                title="Are You Sure?"
                subtitle="You will not be able to recover this product"
                type="warning"
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
              />
            )}

            {editProduct && (
              <Dialog
                open={!!editProduct}
                onClose={() => setEditProduct(null)}
                fullWidth
                PaperProps={{
                  sx: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.9)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Edit Product
                </DialogTitle>
                <DialogContent>
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    label="Title"
                    value={editProduct.name}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, name: e.target.value })
                    }
                    InputProps={{ style: { color: "#fff" } }}
                    InputLabelProps={{ style: { color: "#fff" } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                    }}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    label="Description"
                    value={editProduct.description}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, description: e.target.value })
                    }
                    InputProps={{ style: { color: "#fff" } }}
                    InputLabelProps={{ style: { color: "#fff" } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                    }}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    label="Category"
                    value={editProduct.category}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, category: e.target.value })
                    }
                    InputProps={{ style: { color: "#fff" } }}
                    InputLabelProps={{ style: { color: "#fff" } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                    }}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    label="Price"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, price: Number(e.target.value) })
                    }
                    InputProps={{ style: { color: "#fff" } }}
                    InputLabelProps={{ style: { color: "#fff" } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                    }}
                  />
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button
                    onClick={() => setEditProduct(null)}
                    variant="contained"
                    sx={{
                      backgroundColor: "#555",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#777" },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdate}
                    variant="contained"
                    sx={{
                      backgroundColor: "#FACC15",
                      color: "#000",
                      ml: 2,
                      "&:hover": { backgroundColor: "#FFD700" },
                    }}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Save"}
                  </Button>
                </DialogActions>
              </Dialog>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
