"use client";

import { createUser } from "@/api/service/user.service";
import AlertModal from "@/components/AlertModal";
import { RegisterUser } from "@/types/user";
import { useState } from "react";
import "./styles.css";
import { login } from "@/api/service/authService.service";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState<RegisterUser>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Nome completo é obrigatório";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter no mínimo 8 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const result = await createUser(formData);

      if (result.ok) {
        const result = await login({email:formData.email, password: formData.password});
        if (result.ok) {
          window.location.href = "/";
        }else {
          window.location.href = "/auth/login";
        }
      } else {
        setAlertMessage(result?.message ?? "Algo deu errado");

        setShowAlert(true);
      }
    }
  };

  return (
    <>
      {showAlert && <AlertModal message={alertMessage} onClose={() => setShowAlert(false)} />}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card p-4 shadow">
              <div className="card-body">
                <h2 className="text-center mb-4">Cadastro de Usuário</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name && "is-invalid"}`}
                      id="name"
                      name="name"
                      placeholder="Digite seu nome completo"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email && "is-invalid"}`}
                      id="email"
                      name="email"
                      placeholder="Digite seu e-mail"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Senha
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${errors.password && "is-invalid"}`}
                        id="password"
                        name="password"
                        placeholder="Digite sua senha"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                      </button>
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="form-text">
                      Sua senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.
                    </div>
                  </div>                 
                  <button type="submit" className="btn btn-primary w-100">
                    Cadastrar
                  </button>

                  <div className="text-center mt-3">
                    <p>
                      Já tem uma conta? <a href="/login">Faça login</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
