/**
 * testing scenario
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { describe, it, expect, afterEach } from "vitest";
import { cleanup, queryByAttribute, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import LoginInput from "./LoginInput";

expect.extend(matchers);

const getById = queryByAttribute.bind(null, "id");

describe("LoginInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle email typing correctly", async () => {
    // Arrange
    const dom = render(<LoginInput login={() => {}} />);
    const emailInput = getById(dom.container, "floating_email");

    // Action
    await userEvent.type(emailInput, "emailtest");

    // Assert
    expect(emailInput).toHaveValue("emailtest");
  });

  it("should handle password typing correctly", async () => {
    // Arrange
    const dom = render(<LoginInput login={() => {}} />);
    const passwordInput = getById(dom.container, "floating_password");

    // Action
    await userEvent.type(passwordInput, "passwordtest");

    // Assert
    expect(passwordInput).toHaveValue("passwordtest");
  });
});
