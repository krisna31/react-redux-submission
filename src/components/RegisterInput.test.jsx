/**
 * testing scenario
 *
 * - RegisterInput component
 *  - should handle name typing correctly
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 */

import { describe, it, expect, afterEach } from "vitest";
import { cleanup, queryByAttribute, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import RegisterInput from "./RegisterInput";

expect.extend(matchers);

const getById = queryByAttribute.bind(null, "id");

describe("RegisterInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle name typing correctly", async () => {
    // Arrange
    const dom = render(<RegisterInput register={() => {}} />);
    const nameInput = getById(dom.container, "floating_name");

    // Action
    await userEvent.type(nameInput, "nametest");

    // Assert
    expect(nameInput).toHaveValue("nametest");
  });

  it("should handle email typing correctly", async () => {
    // Arrange
    const dom = render(<RegisterInput register={() => {}} />);
    const emailInput = getById(dom.container, "floating_email");

    // Action
    await userEvent.type(emailInput, "emailtest");

    // Assert
    expect(emailInput).toHaveValue("emailtest");
  });

  it("should handle password typing correctly", async () => {
    // Arrange
    const dom = render(<RegisterInput register={() => {}} />);
    const passwordInput = getById(dom.container, "floating_password");

    // Action
    await userEvent.type(passwordInput, "passwordtest");

    // Assert
    expect(passwordInput).toHaveValue("passwordtest");
  });
});
